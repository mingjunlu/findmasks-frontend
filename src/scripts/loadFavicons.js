(() => {
    const linkTags = document.querySelectorAll('link[data-href]');
    linkTags.forEach((tag) => {
        tag.setAttribute('href', tag.dataset.href);
        tag.removeAttribute('data-href');
    });
})();
