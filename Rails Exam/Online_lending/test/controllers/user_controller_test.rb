require 'test_helper'

class UserControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get user_index_url
    assert_response :success
  end

  test "should get login" do
    get user_login_url
    assert_response :success
  end

  test "should get register" do
    get user_register_url
    assert_response :success
  end

  test "should get lend" do
    get user_lend_url
    assert_response :success
  end

  test "should get borrow" do
    get user_borrow_url
    assert_response :success
  end

end
