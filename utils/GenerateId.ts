export function generateId(prefix = 'id') {
    return prefix + '-' + Math.random().toString(36).slice(2, 10);
}