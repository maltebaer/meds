document.addEventListener('alpine:init', () => {
    Alpine.data('foo', () => ({
        hello: 'walrd!',
    }))
})
