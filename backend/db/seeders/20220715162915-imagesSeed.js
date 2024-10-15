'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Images'

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    const listingImageData = [];
    const imageData = [
        [
            "https://a0.muscache.com/im/pictures/miso/Hosting-1229800983027333882/original/0ea61071-bd37-488d-b676-3071b5fae7f2.jpeg?im_w=960",
            "https://a0.muscache.com/im/pictures/miso/Hosting-1229800983027333882/original/41563cb9-ba6b-4e55-af74-5ae3f8b3f6c0.jpeg?im_w=720",
            "https://a0.muscache.com/im/pictures/miso/Hosting-1229800983027333882/original/d6f10d65-b03a-4513-b4c3-5332ad9c7e91.jpeg?im_w=720",
            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIyOTgwMDk4MzAyNzMzMzg4Mg%3D%3D/original/a47b38e1-2b8a-47fb-a401-49f3b48742f3.jpeg?im_w=1200",
            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIyOTgwMDk4MzAyNzMzMzg4Mg%3D%3D/original/03d106a4-2672-4a15-9e79-110253587de4.jpeg?im_w=1200"
        ],
        [
            "https://a0.muscache.com/im/pictures/4fb2e4a4-35c8-4062-bc63-caf9d2b20147.jpg?im_w=960",
            "https://a0.muscache.com/im/ml/photo_enhancement/pictures/4e6b812c-4078-4bf6-ba96-a8cd9df50cc4.jpg?im_w=720",
            "https://a0.muscache.com/im/ml/photo_enhancement/pictures/f3287a6a-1281-460d-a8a5-5ad88fc6abff.jpg?im_w=720",
            "https://a0.muscache.com/im/pictures/miso/Hosting-54306001/original/30b9302f-59c8-49e7-b4d8-d3ebf32def81.jpeg?im_w=1200",
            "https://a0.muscache.com/im/pictures/d114f45c-3211-4a64-a8a9-290c961f2fdb.jpg?im_w=720"
        ],
        [
            "https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-17223162/original/2b3dd03f-28b0-4c8a-9496-9d8a296e24c8.jpeg?im_w=720",
            "https://a0.muscache.com/im/pictures/miso/Hosting-17223162/original/54264329-0f4b-4bde-842a-02d4ecf16fe1.jpeg?im_w=960",
            "https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-17223162/original/2eb14390-942c-442a-b226-4b3fc4ac3848.jpeg?im_w=720",
            "https://a0.muscache.com/im/pictures/miso/Hosting-17223162/original/c1bf6aa5-89a7-4087-8081-f535d7dc5d4b.jpeg?im_w=1200",
            "https://a0.muscache.com/im/pictures/miso/Hosting-17223162/original/9cb1dd7d-e025-49cd-a9d4-7bbd03f48835.jpeg?im_w=720"
        ],
        [
            "https://a0.muscache.com/im/pictures/miso/Hosting-52424984/original/560a7731-fc01-44b2-8e7f-40ff7fc9f8a4.jpeg?im_w=960",
            "https://a0.muscache.com/im/pictures/8e108feb-6afe-4208-88be-5519116a0627.jpg?im_w=1200",
            "https://a0.muscache.com/im/pictures/airflow/Hosting-47047419/original/d4669244-96d5-4d13-b6a1-44763d992060.jpg?im_w=720",
            "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1034749271994349012/original/15375058-1aaf-4343-a66f-8dedcba3ad6a.jpeg?im_w=720",
            "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1034749271994349012/original/99ef65f7-fc0d-4028-8eda-f6ef2ac574fd.jpeg?im_w=720"
        ],
        [
            "https://a0.muscache.com/im/pictures/miso/Hosting-49594299/original/9ede0ec1-a93c-405a-a879-4797c92f8953.jpeg?im_w=720",
            "https://a0.muscache.com/im/pictures/miso/Hosting-49594299/original/98bfa4e4-facf-4ab4-b6a7-8a64acbf60bb.jpeg?im_w=720",
            "https://a0.muscache.com/im/pictures/miso/Hosting-49594299/original/c3bc4d2c-6fbc-4f88-bcd0-ff403f3c2b20.jpeg?im_w=1200",
            "https://a0.muscache.com/im/pictures/miso/Hosting-49594299/original/a42ea642-b881-442c-94e0-b8cb39120bc1.jpeg?im_w=720",
            "https://a0.muscache.com/im/pictures/miso/Hosting-49594299/original/b5c6be5c-2bcc-416b-a063-305ddbd545ee.jpeg?im_w=1200"
        ]
    ];
    let userId = 1;
    for (let i = 0; i < 50; i++) { // i + 1 references listingId
        let imageIdx = i % 5;
        for (let j = 0; j < imageData[imageIdx].length; j++) { 
            const listingImageObj = {
                userId: userId % 5,
                listingId: i + 1,
                url:imageData[imageIdx][j],
                preview: j == 0 ? true : false,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                createdAt: new Date(),
                updatedAt: new Date()
            }
            listingImageData.push(listingImageObj);
        }
        userId += 1;
        if (userId % 5 == 0) {
            userId += 1;
        }
    }

    return queryInterface.bulkInsert(options, listingImageData, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete(options, null, {});
  }
};
