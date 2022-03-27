import { DataTypes, Model, Optional } from 'sequelize';
import { db } from './index';

export {};
const Sequelize = require('sequelize');

export interface StreamAttributes {
    id: string;
    userId: string;
    parentContractId: string;
    title: string;
    description: string;
    rtmpUrl: string;
    streamKey: string;
    thumbnail: string;
    hlsUrl: string;
    providerStreamId: string;
    hasEnded: boolean;
    videoContractId: string;
    startTime: Date;
    endTime?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export class Streams
  extends Model<StreamAttributes>
  implements StreamAttributes {
  public id: string;

  public title: string;

  public hasEnded: boolean;

  public description: string;

  public parentContractId: string;

  public userId: string;

  public streamKey: string;

  public providerStreamId: string;

  public rtmpUrl: string;

  public hlsUrl: string;

  public startTime: Date;

  public thumbnail: string;

  public videoContractId: string;

  public endTime?: Date;

  public createdAt?: Date;

  public updatedAt?: Date;

  public deletedAt?: Date;
}

Streams.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    hasEnded: {
      type: DataTypes.BOOLEAN,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    rtmpUrl: {
      type: DataTypes.STRING,
    },
    hlsUrl: {
      type: DataTypes.STRING,
    },
    providerStreamId: {
      type: DataTypes.STRING,
    },
    videoContractId: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.STRING,
    },
    parentContractId: {
      type: DataTypes.STRING,
    },
    streamKey: {
      type: DataTypes.STRING,
    },
    startTime: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
    endTime: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
    deletedAt: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    sequelize: db,
    tableName: 'streams7',
    underscored: true,
    freezeTableName: true,
  },
);
