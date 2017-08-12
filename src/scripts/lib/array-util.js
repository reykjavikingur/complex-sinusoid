const ArrayUtil = {
    copy: copy
};

function copy(src, dst, depth) {
    // TODO allow src and dst to have different lengths
    for (let i in dst) {
        let srcItem = src[i];
        if (Array.isArray(srcItem) && depth > 0) {
            copy(srcItem, dst[i], depth - 1);
        }
        else {
            dst[i] = srcItem;
        }
    }
}

module.exports = ArrayUtil;