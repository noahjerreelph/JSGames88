class Lender < ApplicationRecord
	has_many :history
	has_many :borrower, through: :history

	EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]+)\z/i

	validates :first_name, :last_name, :money, presence: true
	validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: EMAIL_REGEX }
	validates :password, presence: true, length: { minimum: 4 }, confirmation: true
	# validates :password_confirmation, presence: true

	def full_name
	    "#{self.first_name} #{self.last_name}"
	end
end
