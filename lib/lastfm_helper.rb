class LastfmHelper
  def self.get_recent_tracks(options={})    
    begin
      LASTFM.user.get_recent_tracks(
         :user  => options[:id], 
         :from  => options[:from] || 365.days.ago.to_i,
         :to    => options[:to]   || 364.days.ago.to_i,
         :page  => options[:page],
         :limit => options[:limit] || 200
       ) || []
    rescue Lastfm::ApiError
      []
    end
  end
end