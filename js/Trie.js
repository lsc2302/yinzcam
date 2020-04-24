export class Trie {
    constructor() {
        this.root = new Map();
        this.end = -1;
    }

    insert(word) {
        let curNode = this.root;
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            if (!(curNode.has(char))) {
                curNode.set(char, new Map());
            }
            curNode = curNode.get(char);
        }
        curNode.set(this.end, true);
    }

    search(word) {
        let curNode = this.root;
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            if (!(curNode.has(char))) {
                return false;
            }
            curNode = curNode.get(char);
        }
        if (!(curNode.has(this.end)))
            return false;
        return true;
    }

    startsWith(prefix) {
        let curNode = this.root;
        for (let char of prefix) {
            if (!(curNode.has(char))) {
                return false;
            }
            curNode = curNode.get(char);
        }
        return true;
    }

    get_start(prefix) {
        function get_key(pre, pre_node) {
            let result = [];
            if (pre_node.get(-1)) {
                result.push(pre);
            }
            pre_node.forEach(function (val, key) {
                if (key !== -1) {
                    result = result.concat(get_key(pre + key, pre_node.get(key)));
                }
            });
            return result
        }

        let res = [];
        if (!this.startsWith(prefix)) {
            return []
        } else if (this.search(prefix)) {
            res.push(prefix);
            return res
        } else {
            let node = this.root;
            for (let i = 0; i < prefix.length; i++) {
                let p = prefix[i];
                node = node.get(p);
            }
            return get_key(prefix, node)
        }
    }
}