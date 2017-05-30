class User < ApplicationRecord
	has_many :post
	has_many :like, :foreign_key => "user_id", :class_name => "Like"
	has_many :liker, :through => :like

	EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]+)\z/i

	validates :name, :alias, presence: true
	validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: EMAIL_REGEX }
	validates :password, presence: true, length: { minimum: 8 }, confirmation: true
end
