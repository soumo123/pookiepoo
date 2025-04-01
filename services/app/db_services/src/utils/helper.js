
import collections from '../collections/collections.js'
import mongoose from 'mongoose';

const generateId = async (collection) => {
    let existingIds = [];
    let lastId;
    let idPrefix;
    let idLength = 8;
    try {
        if (ids === "USER") {
            idPrefix = "USER";
            const Model = mongoose.connection.collection(collection);
            const result = await Model.find().sort({ _id: -1 }).limit(1).toArray();
            lastId = result[0];
            existingIds.push(lastId && lastId.user_id ? lastId.user_id : "");
          }
          if (ids === "QUES") {
            idPrefix = "QUES";
            const Model = mongoose.connection.collection(collection);
            const result = await Model.find().sort({ _id: -1 }).limit(1).toArray();
            lastId = result[0];
            existingIds.push(lastId && lastId.user_id ? lastId.user_id : "");
          }

        const maxNumericPart = existingIds.reduce((max, id) => {
            if (!id || !id.startsWith(idPrefix)) return max; // Check if id is undefined or doesn't start with idPrefix

            const numericPart = parseInt(id.substring(idPrefix.length), 10);
            return numericPart > max ? numericPart : max;
        }, 0);

        const nextCount = maxNumericPart + 1;
        const paddedCount = String(nextCount).padStart(idLength - (idPrefix ? idPrefix.length : 0), "0");
        const nextId = idPrefix + paddedCount;

        return nextId;
    } catch (error) {

    }
}

export { generateId }