'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Spots",[{
      name:"Civic Center Studio With Parking",
      description:"This modern studio is located in one of SF's newer buildings. It has light brown floors, brand new furniture, and includes wifi and a 39-inch flat-screen TV that streams Roku, Amazon Prime, Netflix, and over 60 local channels. In addition to the everyday essentials expected in a modern home (heating, oven, fridge, etc), a dishwasher, microwave, coffee maker, iron, blow dryer, and a washer/dryer are included for your convenience. Our unit is extremely quiet; excellent for getting a good night's rest on a cozy queen size bed. The building's common areas are monitored around the clock for your security.",
      city:"San Francisco",
      state:"California",
      hostId:1,
      image:"https://a0.muscache.com/im/pictures/0f291676-216f-4ab5-b6ef-a9cf0be6e99d.jpg?im_w=960",
      price:26,
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      name:"Charming Garden Apartment, Steps From The Beach",
      description:"Private in-law apartment offering 2 beautifully decorated, clean and comfortable rooms. The bedroom includes a queen bed with crisp linens a down comforter, warm wool rug, beautiful art and closet and dresser for your belongings. The second room is a living space with a couch that converts to a full bed, a separate comfortable reading chair and lamp.",
      city:"San Francisco",
      state:"California",
      hostId:2,
      image:"https://a0.muscache.com/im/pictures/c6cbf264-ec62-4b5e-9084-3fe0672e0780.jpg?im_w=960",
      price:157,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name:"Silicon Valley Studio Apartment",
      description:"Enjoy your privacy in this private studio apartment with private entrance. No need to interact with anyone -- not even the host. This studio apartment has a completely private heating and air conditioning system. Newly remodeled with 24 new wall outlets - including 6 USB wall outlets, a new furnace, new bathroom fixtures, and new security lighting",
      city:"San Jose",
      state:"California",
      hostId:3,
      image:"https://a0.muscache.com/im/pictures/d6706d62-21cb-44bd-b5a1-c4c53d28c103.jpg?im_w=960",
      price:69,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name:"Modern Junior One Bedroom Near Downtown San Jose",
      description:"Located a half mile from the heart of Downtown this property offers convenience and flexibility to all of Silicon Valley. Efficiently designed, modern and spacious, this junior one bedroom has an open kitchen and beautiful sliding glass doors. Walk in bedroom closet as well as coat closet/pantry. In unit washer and dryer. Pets allowed. One reserved parking space conveniently located just below the home in the gated underground garage is included.",
      city:"San Jose",
      state:"California",
      hostId:4,
      image:"https://a0.muscache.com/im/pictures/21d9ec30-9047-494b-a91a-23c5b4b99039.jpg?im_w=960",
      price:90,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name:"Garden cottage in convenient Oakland location.",
      description:"You’ll love my place because of the good location, convenience to public transport, the friendly neighborhood, the ambiance.. My place is good for couples, solo adventurers, business travelers, and families (with kids). Although there is just one bedroom, the couch folds down for extra sleeping space. Please be aware that the property is in a hilly area and that there are stairs to navigate which can be challenging if you have large luggage or mobility issues",
      city:"Oakland",
      state:"California",
      hostId:5,
      image:"https://a0.muscache.com/im/pictures/9a834283-e25f-43e7-a4a0-07b028353b9f.jpg?im_w=720",
      price:80,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name:"Bright Elmwood 1 BR Apt ~ 12 min from Campus",
      description:"This second floor 1-bedroom apartment is in a renovated 1911 Elmwood building, convenient and close to the UC Berkeley campus, restaurants, stores, and transportation.",
      city:"Oakland",
      state:"California",
      hostId:1,
      image:"https://a0.muscache.com/im/pictures/db15d89e-9d15-49fd-bcee-e9da7e05f6b1.jpg?im_w=960",
      price:121,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name:"West Beach Oasis",
      description:"Brand new listing! The dining table and more art will be in place March 26th. This spacious 1 Br with high ceilings is outfitted with a Casper Cal King bed and Parachute linens + towels. Gigabit internet service w/ wifi-6 router make this a perfect monthly rental for a co-working couple. Common areas include a BBQ for grilling, a spot to lock up bikes, as well as a dedicated outdoor parking spot.",
      city:"Santa Barbara",
      state:"California",
      hostId:2,
      image:"https://a0.muscache.com/im/pictures/72958eba-94e0-480b-9907-d72487c96fd8.jpg?im_w=960",
      price:135,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name:"Cozy 2bed in wooded area near beach!",
      description:"Private apartment. Queen size bed in first bedroom. Second bedroom is a full-size pull out sofa with a soft mattress topper. We are located in a wooded area very close to the beach. You will have a reserved parking spot. Wifi Internet is available.",
      city:"Santa Barbara",
      state:"California",
      hostId:3,
      image:"https://a0.muscache.com/im/pictures/87279625/9bf18cf7_original.jpg?im_w=960",
      price:135,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name:"Fun, Sun and Amazing Location",
      description:"Across from the ocean and Pier Set just 100 feet from the sand and the water's edge, the property offers contemporary design & decor in a furnished studio Queen bed Full bath Has a kitchenette, includes small refrigerator, microwave, coffeemaker, hotplate, dishes and kitchen utensils.",
      city:"Santa Monica",
      state:"California",
      hostId:4,
      image:"https://a0.muscache.com/im/pictures/31821632/6d06776e_original.jpg?im_w=960",
      price:68,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name:"Old World Townhouse in SM, Full of Charm",
      description:"• Absolutely adorable 2 bedroom/ 1 bathroom townhouse. Tons of natural light, A/C, Washer/dryer in unit, Beautiful landscaping/lots of green, Located on 6th & Montana",
      city:"Santa Monica",
      state:"California",
      hostId:5,
      image:"https://a0.muscache.com/im/pictures/a8f9dd1d-383b-4987-b08a-78938bc923f1.jpg?im_w=960",
      price:175,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name:"Mammoth Lakes Chalet- Home w/spa & More, 30+ Days",
      description:"The Mammoth Lakes Chalet is an upscale, well appointed home in a quiet, cul-de-sac, located in the heart of town. Bike (on our complimentary bikes) or walk most anywhere, seasonally. W/a well stocked Chef's kitchen, enjoy fab amenities: hot tub, FP,+wood, steam shower, snowshoes, Fitness area, HS Wi-Fi & Office w/twin futon not listed",
      city:"Mammoth Lakes",
      state:"California",
      hostId:1,
      image:"https://a0.muscache.com/im/pictures/e6967ac6-0fd5-4423-b6da-e990b200f19b.jpg?im_w=960",
      price:180,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name:"Long Valley Escape~",
      description:"The Long Valley Escape is a destination location in of itself. With its very own trout pond, streams and fresh mountain spring it’s the perfect place to relax and recharge. Just minutes from Mammoth Yosemite Airport, and a short drive to the Town of Mammoth Lakes it can also serve as a conveniently located hub for the various activities and events in our area.",
      city:"Mammoth Lakes",
      state:"California",
      hostId:2,
      image:"https://a0.muscache.com/im/pictures/dab6542b-efdd-41e9-9970-76edfa16c6a2.jpg?im_w=960",
      price:149,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name:"Modern Bright Studio with private yard! 819B",
      description:"Great modern studio with its own private yard. Full size washer and dryer. 14 high ceilings, close to everything 819 B we have two",
      city:"Sacramento",
      state:"California",
      hostId:3,
      image:"https://a0.muscache.com/im/pictures/d7f859bc-ba42-4dc8-984f-f772a60a5f4f.jpg?im_w=1200",
      price:99,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name:"charming East Sac 1920's home with modern touches",
      description:"Beautiful home at the border of East Sac and Midtown! Many restaurants, coffee shops, bars, and shops within 5 min walk. 5 min walk to east side of Midtown (20 min walk to center) 8 min walk to Safeway grocery store, 11 min to Sacramento Natural Foods Coop 12 min walk to lovely McKinley park",
      city:"Sacramento",
      state:"California",
      hostId:4,
      image:"https://a0.muscache.com/im/pictures/e0af79ed-4e2f-4961-984a-333fc94ec3e2.jpg?im_w=960",
      price:140,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name:"South Lake Tahoe lake front 2 bedroom apartment",
      description:"This is the perfect place for your Tahoe retreat. It comes with everything you will need for weeks long stay, including fresh linens, towels, toiletry and kitchenware. Highspeed internet available throughout the apartment.",
      city:"South Lake Tahoe",
      state:"California",
      hostId:5,
      image:"https://a0.muscache.com/im/pictures/8472911a-f84b-429a-ac87-d4ced0600bf2.jpg?im_w=960",
      price:110,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      name:"Rustic Tahoe home with modern touches",
      description:"Our Comfortable 3BR Home offers a beautiful space for your family & friends to stay and play in Tahoe! We are located in a quiet neighborhood close to restaurants, Heavenly, and the Lake! Enjoy your evenings in a fully equipped kitchen or cooking on the outdoor BBQ. Relax peacefully outside on the house's deck while watching a game on the outside TV or staying warm by the gas fire-pit. Our home offers comfortable furnishings, TV's in all rooms, games for the kids and other family fun.",
      city:"South Lake Tahoe",
      state:"California",
      hostId:1,
      image:"https://a0.muscache.com/im/pictures/92e9248d-b4a4-4985-a9ce-5a61e5dc276f.jpg?im_w=960",
      price:106,
      createdAt:new Date(),
      updatedAt:new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
