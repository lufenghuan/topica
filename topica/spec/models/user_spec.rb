require 'spec_helper'
require 'models/model_helpers'

RSpec.configure do |c|
    c.include ModelHelpers
end

describe User do
  it { should have_searchable_field(:username) }

  context 'create user' do
    it 'should require username' do
     FactoryGirl.build(:user, username: '').should_not be_valid
    end
    it 'should require email' do
      FactoryGirl.build(:user, email: '').should_not be_valid
    end
    it 'should requrre password' do
      FactoryGirl.build(:user, password: '').should_not be_valid
    end
    it 'should require password_confirmation' do
      FactoryGirl.build(:user, password_confirmation: '').
        should_not be_valid
    end
    it 'should require password and password_confirmation match' do
      FactoryGirl.build(:user, password: '123', password_confirmation: '456').
        should_not be_valid
    end
    it 'should require unique email' do
      user = FactoryGirl.create(:user)
      FactoryGirl.build(:user, email: user.email).should_not be_valid
    end
  
  end # end of create user

  context 'after valid users are created' do
    # create one user and 20 topic, and let the 
    # user following odd id topic
    before(:each) do
      @user = FactoryGirl.create(:user)
    end
    describe 'following' do
      before(:each) do
        @following_topic_ids = create_followship(@user.id).
                               map{|t| t.id}
      end
      describe 'following_topics' do
        it 'following_topics should get all the topics the user are following' do
          @user.following_topics.pluck(:id).should ==  @following_topic_ids
        end
      end
      describe 'following_posts' do
        it 'should get all the posts belongs to the topics following' do
          post_ids = FactoryGirl.create_list(:post, 30, user_id: @user.id).
                                  map{|post| post.id}
          all_topic_ids = Topic.pluck(:id)
          # each post assign to random topic
          r = []
          post_ids.each do |p_id|
            t_id = all_topic_ids.sample
            FactoryGirl.create(:category, topic_id: t_id, post_id: p_id)
            if @following_topic_ids.include?(t_id)
              r << p_id
            end
          end
          @user.following_posts.pluck(:id).sort.should == r
        end
      end
    end 
    describe 'favoring_posts' do
      it 'should get all the posts the user are favoriing' do
        favored_posts = create_favoring(@user.id)
        @user.favoring_posts.should == favored_posts
      end
    end

  end #end of vailid user created
end
