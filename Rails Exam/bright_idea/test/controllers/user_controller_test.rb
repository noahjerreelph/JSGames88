require 'test_helper'

class UserControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get user_index_url
    assert_response :success
  end

  test "should get register" do
    get user_register_url
    assert_response :success
  end

  test "should get main" do
    get user_main_url
    assert_response :success
  end

  test "should get profile" do
    get user_profile_url
    assert_response :success
  end

  test "should get show" do
    get user_show_url
    assert_response :success
  end

end
