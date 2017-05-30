class UserController < ApplicationController
  def index
    session[:user] = nil
  end

  def register
    @user = User.create(user_params)
    if @user.save
      flash[:success] = "Account successfully created"
    else
      flash[:error] = @user.errors.full_messages
    end
    redirect_to '/'
  end

  def login
    @user = User.where("users.email = '#{user_params['email']}' and users.password = '#{user_params['password']}'")
    if @user.empty?
      flash[:login_error] = "Invalid User"
      redirect_to '/'
    else
      session[:user] = @user[0]
      redirect_to '/bright_ideas'
    end
  end

  def logout
    session[:user] = nil
    redirect_to '/'
  end

  def post
    if params['post']['idea'] != ""
      @post = Post.create(:user => User.find(params['post']['id']),
                            :idea => params['post']['idea'])
    end
    redirect_to '/bright_ideas'
  end

  def main
    if session[:user] == nil
      redirect_to '/'
    else
      @post = Post.all
      # render :html => "#{@likes.count}"
    end
  end

  def like
    if session[:user] == nil
      redirect_to '/'
    else
      @post = Post.find(params[:id])
      @liker = @post.like.group('like')
      # render :html => "#{@liker.first.liker.inspect}" 
    end
  end

  def add_like
    @like = Like.create(user: User.find(params[:user]), post: Post.find(params[:post]), like: session[:user]['id'])
    # render :html => "#{@like.save.inspect}"
    redirect_to '/bright_ideas'
  end

  def destroy
    if session[:user] == nil
      redirect_to '/'
    else
      Post.find(params[:post]).destroy
      redirect_to '/bright_ideas'
    end
  end

  def show
    if session[:user] == nil
      redirect_to '/'
    else
      @user = User.find(params[:id])
      @post = User.find(params[:id]).post.count
      @likes = User.find(params[:id]).like.group("like").count()
    end
    # render :html => "#{@likes.count}"
  end

  private
    def user_params
      params.require(:user).permit(:name, :alias, :email, :password, :password_confirmation)
    end
end
