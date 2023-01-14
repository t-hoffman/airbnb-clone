const {Home,Review} = require('./models');
const LAdata = require('./data/LAdata.json');
const NYdata = require('./data/NewYorkdata.json');
const PAdata = require('./data/Parisdata.json');
const CHdata = require('./data/Chicagodata.json');
const MIdata = require('./data/Miamidata.json');
const JTdata = require('./data/JoshuaTreedata.json');
const BHdata = require('./data/BHdata.json');
const OMG1data = require('./data/OMGdata1.json');
const OMG2data = require('./data/OMG2data.json');
const OMG3data = require('./data/OMG3data.json');

async function seedData(data) {
    // const homeDeleted = await Home.deleteMany({});
    // const reviewDeleted = await Review.deleteMany({})
    let seedingData = [];    
    data.forEach(async d => {
        const rate = d.pricing.rate ? d.pricing.rate.amount : '';
        let photos = []

        if (d.photos.length > 0) {
            d.photos.map(p => {
                photos.push(p.pictureUrl)
            })
        }

        const lat = d.location ? d.location.lat : '';
        const lng = d.location ? d.location.lng : '';
        
        const createdHome = await Home.create({
            name: d.name,
            address: d.address,
            location: {
                lat: lat,
                long: lng
            },
            numberOfGuests: d.numberOfGuests,
            rate: rate,
            roomType: d.roomType,
            stars: d.stars,
            url: d.url,
            photos: photos,
            host: {
                name: d.primaryHost.smartName,
                about: d.primaryHost.about,
                photo: d.primaryHost.pictureUrl,
                isSuperHost: d.primaryHost.isSuperHost
            }
        });

        if (d.reviews.length > 0) {
            d.reviews.map(async r => {
                const seedData = await Review.create({
                    author: {
                        name: r.author.smartName,
                        photo: r.author.pictureUrl,
                    },
                    comments: r.comments,
                    cratedDate: r.createdAt,
                    date: r.localizedDate,
                    response: r.response,
                    ratings: {
                        home: r.rating,
                        cleanliness: Math.floor(Math.random() * 6 - 0),
                        checkin: Math.floor(Math.random() * 6 - 0),
                        accuracy: Math.floor(Math.random() * 6 - 0),
                        location: Math.floor(Math.random() * 6 - 0),
                        value: Math.floor(Math.random() * 6 - 0)
                    }
                });

                const homeUpdate = await Home.findByIdAndUpdate(
                    createdHome._id, {
                        $push: {
                            reviews: {
                                _id: seedData._id,
                                author: {
                                    name: seedData.author.name,
                                    photo: seedData.author.photo,
                                },
                                comments: seedData.comments,
                                cratedDate: seedData.createdDate,
                                date: seedData.date,
                                response: seedData.response,
                                ratings: {
                                    home: seedData.ratings.home,
                                    cleanliness: seedData.ratings.cleanliness,
                                    checkin: seedData.ratings.checkin,
                                    accuracy: seedData.ratings.accuracy,
                                    location: seedData.ratings.location,
                                    value: seedData.ratings.value
                                }
                            }
                        }
                    }
                )
            })
        }
    });
    console.log('complete')
}

// seedData(LAdata);
// seedData(NYdata);
// seedData(PAdata);
// seedData(CHdata);
// seedData(MIdata);
// seedData(BHdata);
// seedData(JTdata);
// seedData(OMG1data);
// seedData(OMG2data);