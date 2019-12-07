songsInfo.forEach(function (songInfo) {  
  if (!(songInfo.id in allArtistsFromModel)) {
      const artistModelEntry = new ArtistInfo.Artist({
          SongId: songInfo.id,
          SongName: songInfo.name,
          Artist: songInfo.artist //** look up what field is correct b/c Idk
          });
        artistModelEntry.save();
    } else {
        if(user.id in allUsersFromModel) {
            db.collections.update({ UserId: { $eq: user.id }, Songs: SongId }); //mongo update i think this is correct will test later and fix if its not 
            break;
        } else { 
            const userModelEntry = new UserData.User({
                UserID: userID,
                Songs: songIds,
                Username: userDisplay,
            });
            userModelEntry.save();
        }
    }
}