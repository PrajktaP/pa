class Expense < ApplicationRecord
  belongs_to :user
  
  scope :searched_by_keyword, lambda {|query|
    self.where("reason like ? or details like ?", 
      "%#{query}%", "%#{query}%")
  }
  
  scope :unarchived, -> { where(:deleted => false) }
  
  scope :between, lambda{|time|
    self.where("created_at > '#{time.at_beginning_of_month}' and created_at < '#{time.at_end_of_month}'")
  }
end
