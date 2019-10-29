const spotterflyServer = require('../spotterflyServer');
const { app } = spotterflyServer;
const ArtistModel = require('../model/Artist.model');
const MyFunctions = require('./MyFunctions');


describe('spotterflyServer tests', () => {
    it('should import', () => {
        expect(true).toBe(true);
    });

    it('should generate an artistShema', () => {
        const artistSchema = ArtistModel.getArtistSchema();
        expect(artistSchema.hasOwnProperty('ArtistID')).toEqual(true);
    });
    it('Should prove true since we added a name field', () => {
        const artistSchema = ArtistModel.getArtistSchema();
        expect(artistSchema.hasOwnProperty('Name')).toEqual(true);
    });

    it('makes sure there are songs should prove currently false since there is no field', () => {
        const artistSchema = ArtistModel.getArtistSchema();
        expect(artistSchema.hasOwnProperty('Songs')).toEqual(false);
    });

    it('distance based on lon and lat should return 0 here', () => {
        const result = MyFunctions.distance(1000,3000,1000,3000);
        expect(result).toBe(0);
    });

    it('check if two points are within the set range', () => {
        const new_result = MyFunctions.distance_checker(10,40);
        expect(new_result).toBe(true);
    });
    it('checks if two items match.eventually will use this for all songs', () => {
        const result = MyFunctions.overlap_check("Hello","Hello", 0);
        expect(result).toBe(1);
    });
    it('checks if two items match.eventually will use this for all songs should be unchanged', () => {
        const result = MyFunctions.overlap_check("Hello","World", 1);
        expect(result).toBe(1);
    });
    
    it('checks for overlap match', () => {
        const result = MyFunctions.match(4,5);
        expect(result).toBe(false);
    });
    it('checks for overlap match should be true', () => {
        const result = MyFunctions.match(5,5);
        expect(result).toBe(true);
    });


});