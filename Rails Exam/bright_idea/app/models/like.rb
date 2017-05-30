class Like < ApplicationRecord
	belongs_to :post
  	belongs_to :user, :foreign_key => "user_id", :class_name => "User"
	belongs_to :liker, :foreign_key => "like", :class_name => "User"
end
