// Recursive functions to update or add data in tree

export function addChildToTree(tree, targetId, newChild) {
    const addRecursive = (node) => {
        if (node.id === targetId) {
            return {
                ...node,
                children: [...node.children, newChild],
            };
        }

        if (node.children && node.children.length > 0) {
            return {
                ...node,
                children: node.children.map(addRecursive),
            };
        }

        return node;
    };
    return addRecursive(tree);
}

export function updateChildData(tree, targetId, newData) {
    const addRecursive = (node) => {
        if (node.id === targetId) {
            return {
                ...node,
                data: newData,
            };
        }

        if (node.children && node.children.length > 0) {
            return {
                ...node,
                children: node.children.map(addRecursive),
            };
        }

        return node;
    };
    return addRecursive(tree);
}

export function updateChildName(tree, targetId, newName) {
    const addRecursive = (node) => {
        if (node.id === targetId) {
            return {
                ...node,
                name: newName,
            };
        }

        if (node.children && node.children.length > 0) {
            return {
                ...node,
                children: node.children.map(addRecursive),
            };
        }

        return node;
    };
    return addRecursive(tree);
}