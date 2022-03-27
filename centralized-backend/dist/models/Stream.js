"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Streams = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const Sequelize = require('sequelize');
class Streams extends sequelize_1.Model {
}
exports.Streams = Streams;
Streams.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    hasEnded: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    thumbnail: {
        type: sequelize_1.DataTypes.STRING,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    rtmpUrl: {
        type: sequelize_1.DataTypes.STRING,
    },
    hlsUrl: {
        type: sequelize_1.DataTypes.STRING,
    },
    providerStreamId: {
        type: sequelize_1.DataTypes.STRING,
    },
    videoContractId: {
        type: sequelize_1.DataTypes.STRING,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
    },
    parentContractId: {
        type: sequelize_1.DataTypes.STRING,
    },
    streamKey: {
        type: sequelize_1.DataTypes.STRING,
    },
    startTime: {
        type: sequelize_1.DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW,
    },
    endTime: {
        type: sequelize_1.DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW,
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW,
    },
}, {
    sequelize: index_1.db,
    tableName: 'streams7',
    underscored: true,
    freezeTableName: true,
});
//# sourceMappingURL=Stream.js.map