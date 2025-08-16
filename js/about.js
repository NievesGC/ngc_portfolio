let expandedBox = null;

function expandBox(box) {
    if (expandedBox && expandedBox !== box) {
        closeBox();
    }

    expandedBox = box;
    box.classList.add('expanded');
    document.querySelector('.overlay').classList.add('active');

    // Don't prevent body scroll completely, just manage it better
    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Store original overflow to restore later
    box.dataset.originalBodyOverflow = originalBodyOverflow;

    // Animate the expansion
    setTimeout(() => {
        const closeBtn = box.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.style.display = 'flex';
        }
        // Focus on the box content to enable keyboard scrolling
        const boxContent = box.querySelector('.box-content');
        if (boxContent) {
            boxContent.focus();
        }
    }, 200);
}

function closeBox() {
    if (expandedBox) {
        const closeBtn = expandedBox.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.style.display = 'none';
        }

        expandedBox.classList.remove('expanded');
        document.querySelector('.overlay').classList.remove('active');

        // Restore original body overflow
        const originalOverflow = expandedBox.dataset.originalBodyOverflow || 'auto';
        document.body.style.overflow = originalOverflow;

        setTimeout(() => {
            expandedBox = null;
        }, 500);
    }
}

// Close on ESC key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && expandedBox) {
        closeBox();
    }
});

// Prevent body scroll when expanded
document.addEventListener('wheel', function (e) {
    if (expandedBox && !expandedBox.contains(e.target)) {
        e.preventDefault();
    }
}, { passive: false });