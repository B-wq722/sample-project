const API = 'http://localhost:5000/api';
let items = [];
let editingId = null;

async function fetchItems() {
    try {
        const response = await fetch(`${API}/items`);
        items = await response.json();
        renderTable(items);
        updateDashboard();
    } catch (error) {
        console.error('Failed fetching items:', error);
    }
}

function renderTable(data) {
    const tbody = document.querySelector('.inventory-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    data.forEach(item => {
        const value = (item.price * item.quantity).toFixed(2);
        const isLow = item.quantity < 15;

        tbody.innerHTML += `
        <tr class="${isLow ? 'low-stock' : ''}">
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td><em>${item.quantity}</em></td>
            <td>${parseFloat(item.price).toFixed(2)}</td>
            <td>${value}</td>
            <td>
                <button onclick="editItem(${item.id})">Edit</button>
                <button onclick="deleteItem(${item.id})">Delete</button>
            </td>
        </tr>
        `;
    });
}

async function saveItem(e) {
    e.preventDefault();

    const itemData = {
        name: document.querySelector('#item-name').value,
        category: document.querySelector('#item-category').value,
        quantity: parseInt(document.getElementById('item-quantity').value, 10) || 0,
        price: parseFloat(document.getElementById('item-price').value) || 0
    };

    try {
        if (editingId) {
            await fetch(`${API}/items/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemData)
            });
        } else {
            await fetch(`${API}/items`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemData)
            });
        }

        closeModal();
        fetchItems();
    } catch (error) {
        alert('Failed to save item:');
    }
}

function showAddModal() {
    editingId = null;
    document.getElementById('modal-title').textContent = 'Add new item';
    document.getElementById('item-form').reset();
    document.getElementById('item-modal').style.display = 'flex';
}

function editItem(id) {
    const item = items.find(i => i.id === id);
    if (!item) return;

    editingId = id;
    document.getElementById('modal-title').textContent = 'Edit item';
    document.getElementById('item-name').value = item.name;
    document.getElementById('item-category').value = item.category;
    document.getElementById('item-quantity').value = item.quantity;
    document.getElementById('item-price').value = item.price;
    document.getElementById('item-modal').style.display = 'flex';
}

async function deleteItem(id) {
    if (confirm('Do you want to delete this item?')) {
        await fetch(`${API}/items/${id}`, {
            method: 'DELETE'
        });
        fetchItems();
    }
}

function closeModal() {
    document.getElementById('item-modal').style.display = 'none';
}

function filterItems() {
    const term = document.getElementById('search').value.toLowerCase();
    const filtered = items.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
    );
    renderTable(filtered);
}

function updateDashboard() {
    const totalItems = items.length;
    const totalValue = items.reduce((sum, i) => sum + (i.quantity * i.price), 0);
    const lowStock = items.filter(i => i.quantity < 15).length;
    document.getElementById('stats').innerHTML = `
        <div class="card">
            <h3>Total Items</h3>
            <h2>${totalItems}</h2>
        </div>
        <div class="card">
            <h3>Total stock value</h3>
            <h2>$${totalValue.toFixed(2)}</h2>
        </div>
        <div class="card">
            <h3>Low Stock Items</h3>
            <h2 style="color: red;">${lowStock}</h2>
        </div>
    `;
}

function showSection(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(section).classList.add('active');
}

// Initialization and loading data
document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.getElementById('add-item');
    const searchInput = document.getElementById('search');
    const form = document.getElementById('item-form');
    
    if (addBtn) addBtn.addEventListener('click', showAddModal);
    if (searchInput) searchInput.addEventListener('input', filterItems);
    if (form) form.addEventListener('submit', saveItem);
    
    fetchItems();
});