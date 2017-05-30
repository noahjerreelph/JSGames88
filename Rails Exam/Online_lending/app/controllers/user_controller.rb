class UserController < ApplicationController

  def index
    session[:user] = nil    
  end

  def login
      session[:user] = Lender.where("lenders.email = '#{user_params[:email]}' and lenders.password = '#{user_params[:password]}' ")
      status = 0
    if session[:user].empty?
      session[:user] = Borrower.where("borrowers.email = '#{user_params[:email]}' and borrowers.password = '#{user_params[:password]}' ")
      status = 1
    end

    if session[:user].empty?
      flash[:login] = "Invalid user"
      redirect_to '/'
    else
      if status == 0
        redirect_to '/lender'
      else
        redirect_to '/borrower'
      end
    end
  end

  def register
  end

  def lending
    money = params[:lend]['money'].to_i - params[:lend]['amount'].to_i
    raised = params[:lend]['raised'].to_i + params[:lend]['amount'].to_i     
    @history = History.where("histories.lender_id = #{params[:lend]['id']} and histories.borrower_id = #{params[:id]}")
    lender = Lender.where(:id => params[:lend]['id']).update(:money => money)
    borrower = Borrower.find(params[:id]).update(:raised => raised)
    if @history.empty?
      @history = History.create(:amount => params[:lend]['amount'],
                                :lender => Lender.find(params[:lend]['id']),
                                :borrower => Borrower.find(params[:id]) )
    else
      amount = @history[0].amount + params[:lend]['amount'].to_i
      @history.update(:amount => amount)
    end
    redirect_to = '/lender'
  end

  def logout
    session[:user] = nil
    redirect_to '/'
  end

  def new_user
    if user_params.keys.length > 6
      session[:user] = Borrower.create(user_params)
    else
      session[:user] = Lender.create(user_params)
    end

    if session[:user].save
      flash[:success] = "Account has been created"
    else
      flash[:error] = session[:user].errors.full_messages
    end
    redirect_to '/register'
  end

  def lend
    @user = Lender.find(session[:user][0]['id'])
    @borrower = Borrower.all
    @lended = Lender.find(@user['id']).history
  end

  def borrow
    @user = session[:user][0]
    @lender = Borrower.find(@user['id']).history
  end
  private
    def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :money, :purpose, :description, :raised)
    end
end
