'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// szy
// SaleIssueEntry

module.exports = function (sequelize, DataTypes) {
						var _sequelize$define;

						return sequelize.define('PurInEntry', (_sequelize$define = {
												////////entry
												FID: {
																		type: DataTypes.STRING,
																		allowNull: false,
																		primaryKey: true
												},
												FQty: {
																		type: DataTypes.DECIMAL,
																		allowNull: true
												},
												FBaseQty: {
																		type: DataTypes.DECIMAL,
																		allowNull: true
												},
												FPrice: {
																		type: DataTypes.DECIMAL,
																		allowNull: true
												},
												FAmount: {
																		type: DataTypes.DECIMAL,
																		allowNull: true
												},
												FUnitActualCost: {
																		type: DataTypes.DECIMAL,
																		allowNull: true
												},
												FActualCost: {
																		type: DataTypes.DECIMAL,
																		allowNull: true
												},
												FPurOrderNumber: {
																		type: DataTypes.STRING,
																		allowNull: true
												},
												FPurOrderID: {
																		type: DataTypes.STRING,
																		allowNull: true
												},
												FTax: {
																		type: DataTypes.DECIMAL,
																		allowNull: true
												}
						}, _defineProperty(_sequelize$define, 'FActualCost', {
												type: DataTypes.DECIMAL,
												allowNull: true
						}), _defineProperty(_sequelize$define, 'FActualCost', {
												type: DataTypes.DECIMAL,
												allowNull: true
						}), _defineProperty(_sequelize$define, 'FTaxPrice', {
												type: DataTypes.DECIMAL,
												allowNull: false
						}), _defineProperty(_sequelize$define, 'FTaxAmount', {
												type: DataTypes.DECIMAL,
												allowNull: false
						}), _defineProperty(_sequelize$define, 'FDescription', {
												type: DataTypes.STRING,
												allowNull: true
						}), _defineProperty(_sequelize$define, 'FAuditTime', { //审核时间
												type: DataTypes.DATE,
												allowNull: true
						}), _defineProperty(_sequelize$define, 'FYear', {
												type: DataTypes.INTEGER,
												allowNull: false
						}), _defineProperty(_sequelize$define, 'FPeriod', {
												type: DataTypes.INTEGER,
												allowNull: false
						}), _defineProperty(_sequelize$define, 'FMonth', {
												type: DataTypes.INTEGER,
												allowNull: true
						}), _defineProperty(_sequelize$define, 'FDay', {
												type: DataTypes.INTEGER,
												allowNull: true
						}), _defineProperty(_sequelize$define, 'FBizDate', {
												type: DataTypes.DATE,
												allowNull: true
						}), _defineProperty(_sequelize$define, 'FNumber', {
												type: DataTypes.STRING,
												allowNull: true
						}), _defineProperty(_sequelize$define, 'FBaseStatus', { //单据状态
												type: DataTypes.INTEGER,
												allowNull: true
						}), _defineProperty(_sequelize$define, 'FCreateTime', {
												type: DataTypes.DATE,
												allowNull: true
						}), _defineProperty(_sequelize$define, 'FSupplier', {
												type: DataTypes.STRING,
												allowNull: true
						}), _defineProperty(_sequelize$define, 'FMaterialNumber', {
												type: DataTypes.STRING,
												allowNull: true
						}), _defineProperty(_sequelize$define, 'FMaterial', {
												type: DataTypes.STRING,
												allowNull: true
						}), _defineProperty(_sequelize$define, 'FMaterialModel', {
												type: DataTypes.STRING,
												allowNull: true
						}), _defineProperty(_sequelize$define, 'FMaterialDisplayName', {
												type: DataTypes.STRING,
												allowNull: true
						}), _defineProperty(_sequelize$define, 'FMaterialType0', {
												type: DataTypes.STRING,
												allowNull: true
						}), _defineProperty(_sequelize$define, 'FMaterialType1', {
												type: DataTypes.STRING,
												allowNull: true
						}), _defineProperty(_sequelize$define, 'FMaterialType2', {
												type: DataTypes.STRING,
												allowNull: true
						}), _defineProperty(_sequelize$define, 'FMaterialType3', {
												type: DataTypes.STRING,
												allowNull: true
						}), _defineProperty(_sequelize$define, 'FBrandFertilizer', {
												type: DataTypes.STRING,
												allowNull: true
						}), _defineProperty(_sequelize$define, 'FBrandCarbaMind', {
												type: DataTypes.STRING,
												allowNull: true
						}), _sequelize$define));
};