'use strict';
module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define('Listing', {
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    previewImageUrl: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        max: 50
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 500],
          msg: "Description must be between 1 and 500 characters"
        }
      },
    },
    serviceFee: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    cleaningFee: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    beds: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    baths: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    maxGuests: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zipCode: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {});

  Listing.associate = function(models) {
    //need to figure out onCascade delete for listings and images also with previewimage, might lead to circular delete, possible solition is make listingId nullable on image and for preview image leave it blank
    Listing.belongsTo(models.User, { foreignKey: 'ownerId' });
    Listing.hasMany(models.Review, { foreignKey: 'listingId', onDelete: 'CASCADE', hooks: 'true'})
    //docs say to use singular for belongsTo aliases and plural for hasMany aliases
    Listing.hasMany(models.Image, { foreignKey: 'listingId', onDelete: 'CASCADE', hooks: 'true' }); //has alias
    Listing.hasMany(models.ListingBrowseHistory, { foreignKey: 'listingId', onDelete: 'CASCADE', hooks: 'true' });
    Listing.hasMany(models.ListingPrice, { foreignKey: 'listingId', onDelete: 'CASCADE', hooks: 'true' });
    Listing.hasMany(models.Booking, { foreignKey: 'listingId', onDelete: 'CASCADE', hooks: 'true' });
    Listing.hasMany(models.WishListListing, { foreignKey: 'listingId', onDelete: 'CASCADE', hooks: 'true' });
    // Listing.hasMany(models.ListingCategory, { foreignKey: 'listingId', onDelete: 'CASCADE', hooks: 'true' });
    // TO BE CONTINUED

    const columnMap1 = {
      through: models.ListingCategory,
      foreignKey: 'listingId',
      otherKey: 'categoryId'
    }
    Listing.belongsToMany(models.Category, columnMap1)

    const columnMap2 = {
      through: 'ListingAmenity',
      foreignKey: 'listingId',
      otherKey: 'amenityId'
    }
    Listing.belongsToMany(models.Amenity, columnMap2)

    const columnMap3 = {
      through: 'WishListListing',
      foreignKey: 'listingId',
      otherKey: 'wishlistId'
    }
    Listing.belongsToMany(models.WishList, columnMap3)
  };
  return Listing;
};
