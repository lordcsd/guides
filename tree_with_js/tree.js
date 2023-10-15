class Node {
  value;
  left;
  right;
  constructor(value) {
    this.value = value;
  }
}

class Tree {
  root = new Node();

  add(value, node = this.root) {
    if (!node.value) {
      node.value = value;
      return;
    }

    if (value <= node.value) {
      if (!node.left) {
        node.left = new Node(value);
      } else {
        return this.add(value, node.left);
      }
    }

    if (value > node.value) {
      if (!node.right) {
        node.right = new Node(value);
      } else {
        return this.add(value, node.right);
      }
    }
  }

  allPaths = [];
  getPaths(node, path) {
    this.allPaths = [];
    this._getPaths(node, path);
    return this.allPaths;
  }

  _getPaths(node, path = []) {
    if (node.value) {
      path.push(node.value);
    }

    if (!node.left && !node.right) {
      this.allPaths.push(path);
    }

    if (node.left) {
      const pathCopy = path.slice();
      this._getPaths(node.left, pathCopy);
    }

    if (node.right) {
      const pathCopy = path.slice();
      this._getPaths(node.right, pathCopy);
    }
  }

  remove(value, parent = this.root, field = "", node = this.root) {
    const paths = this.getPaths(this.root, []);
    
    const valueExists = paths.find((path) =>
      path.find((_value) => _value == value)
    );

    // to avoid infinite loops
    if (!valueExists) return;

    return this._remove(value, parent, field, node);
  }

  _remove(value, parent = this.root, field = "", node = this.root) {
    if (node.value == value) {
      if (parent[field]) delete parent[field];
      return;
    }

    if (value <= node.value) {
      return this._remove(value, node, "left", node.left);
    } else if (value > node.value) {
      return this._remove(value, node, "right", node.right);
    }
  }
}

const values = [1, 3, 2, 5, 6, 3, 7];
const tree = new Tree();
for (const value of values) {
  tree.add(value);
}

console.log(tree.getPaths(tree.root, []));
