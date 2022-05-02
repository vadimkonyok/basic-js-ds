const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.rootNode = null;
  }

  add(data) {
    this.rootNode = findPlaceToAdd(this.rootNode, data);

    function findPlaceToAdd(node, data) {
      if (!node) {
        return new Node(data);
      } else if (data === node.data) {
        return node;
      } else if (data < node.data) {
        node.left = findPlaceToAdd(node.left, data);
      } else {
        node.right = findPlaceToAdd(node.right, data);
      }

      return node;
    }
  }

  root() {
    return this.rootNode;
  }

  has(data) {
    return searchFornode(this.rootNode, data);

    function searchFornode(node, data) {
      if (!node) {
        return false;
      } else if (data === node.data) {
        return true;
      } else if (data < node.data) {
        return searchFornode(node.left, data);
      } else {
        return searchFornode(node.right, data);
      }
    }
  }

  find(data) {
    return searchFornode(this.rootNode, data);

    function searchFornode(node, data) {
      if (!node) {
        return null;
      } else if (data === node.data) {
        return node;
      } else if (data < node.data) {
        return searchFornode(node.left, data);
      } else {
        return searchFornode(node.right, data);
      }
    }
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let maxFromLeft = node.left;

        while (maxFromLeft.right) {
          maxFromLeft = maxFromLeft.right;
        }

        node.data = maxFromLeft.data;

        node.left = removeNode(node.left, maxFromLeft.data);

        return node;
      }
    }
  }

  min() {
    if (!this.rootNode) {
      return;
    }

    let minNode = this.rootNode;
    while (minNode.left) {
      minNode = minNode.left;
    }

    return minNode.data;
  }

  max() {
    if (!this.rootNode) {
      return;
    }

    let maxNode = this.rootNode;
    while (maxNode.right) {
      maxNode = maxNode.right;
    }

    return maxNode.data;
  }

}

module.exports = {
  BinarySearchTree
};