class Post < ApplicationRecord
  belongs_to :user
  has_many :like,  :dependent => :destroy

	validates :idea, presence: true
end
