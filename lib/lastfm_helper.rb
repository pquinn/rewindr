class LastfmHelper
  def self.get_recent_tracks(options={})
    tracks = []
    
    begin
      tracks = LASTFM.user.get_recent_tracks(
                 :user  => options[:user_name], 
                 :from  => options[:from] || 365.days.ago.to_i,
                 :to    => options[:to]   || 364.days.ago.to_i,
                 :page  => options[:page],
                 :limit => options[:limit] || 200
               ) || []
    rescue Lastfm::ApiError
    end
                             
    LastfmHelper.fix_duplicate_listens(tracks)
  end
  
  def self.fix_duplicate_listens(tracks)
    previous_time = ""
    tracks.each do |track|
      if track["date"]["uts"] == previous_time
        track["date"]["uts"] = (track["date"]["uts"].to_i + 1).to_s
      end
      previous_time = track["date"]["uts"]
    end
    tracks
  end
end