class LastfmHelper
  def self.how_many_albums(tracks)
    tracks.inject({}) do |memo, track|
      album_name = track["album"]["content"]
      
      memo[album_name] ||= 0
      memo[album_name] +=  1
      memo
    end
  end
  
=begin
  def self.penis
    10.times do |n|
      list = LASTFM.user.get_recent_tracks(
        :user => "Phillmatic19", 
        :limit => 200,
        :from => (n.month.ago - 1.days).to_i,
        :to => n.month.ago.to_i
      )
      puts Stuff.how_many_albums(list).sum.length / 2
    end
  end
=end

end