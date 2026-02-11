import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Array "mo:core/Array";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Data Types
  public type UserProfile = {
    name : Text;
    email : Text;
  };

  type HelpRequest = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  type LessonCategory = {
    id : Nat;
    title : Text;
    description : Text;
  };

  type Lesson = {
    id : Nat;
    title : Text;
    content : Text;
    categoryId : Nat;
    tags : [Text];
    difficulty : Text;
  };

  module Lesson {
    public func compareByCategoryAndId(lesson1 : Lesson, lesson2 : Lesson) : Order.Order {
      // Compare by category first, then by id within the same category
      switch (categoryCompare(lesson1.categoryId, lesson2.categoryId)) {
        case (#equal) { idCompare(lesson1.id, lesson2.id) };
        case (order) { order };
      };
    };

    func categoryCompare(categoryId1 : Nat, categoryId2 : Nat) : Order.Order {
      if (categoryId1 < categoryId2) {
        #less;
      } else if (categoryId1 > categoryId2) {
        #greater;
      } else {
        #equal;
      };
    };

    func idCompare(id1 : Nat, id2 : Nat) : Order.Order {
      if (id1 < id2) {
        #less;
      } else if (id1 > id2) {
        #greater;
      } else {
        #equal;
      };
    };
  };

  // Persistent Data (Stable State)
  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextHelpRequestId = 1;
  let helpRequests = Map.empty<Nat, HelpRequest>();
  let categories = Map.fromArray<Nat, LessonCategory>([
    (1, {
      id = 1;
      title = "Freelancing";
      description = "Learn how to start freelancing online.";
    }),
    (2, {
      id = 2;
      title = "Remote Jobs";
      description = "Find and qualify for trusted remote job opportunities.";
    }),
    (3, {
      id = 3;
      title = "Online Business";
      description = "Start your own online business from home.";
    }),
  ]);

  let lessons = Map.fromArray<Nat, Lesson>(
    [
      (
        1,
        {
          id = 1;
          title = "Getting Started with Freelancing";
          content = "Freelancing offers the opportunity to work with clients around the world, but it's important to set up your business properly. This lesson covers essential topics such as writing a clear scope of work, managing payments through trusted platforms, and understanding contract basics. Always use secure payment methods and never pay upfront fees for job opportunities.";
          categoryId = 1;
          tags = ["freelancing", "getting started"];
          difficulty = "Beginner";
        },
      ),
      (
        2,
        {
          id = 2;
          title = "Top Trusted Remote Job Platforms";
          content = "Finding genuine remote job opportunities requires careful vetting and research. In this lesson, we explore the best platforms for remote work, verify company credibility, and provide tips for setting up secure payment methods. Remember to avoid job listings that request upfront payment—from application fees to equipment purchases.";
          categoryId = 2;
          tags = ["remote jobs", "trusted platforms"];
          difficulty = "Intermediate";
        },
      ),
      (
        3,
        {
          id = 3;
          title = "Launching Your Online Store";
          content = "Starting an online business begins with market research and product validation. This lesson guides you through choosing selling platforms, ensuring payment safety, and developing a secure marketing strategy. Understand common scam warning signs, avoid unrealistic income guarantees, and maintain a customer-first approach.";
          categoryId = 3;
          tags = ["e-commerce", "business", "safety"];
          difficulty = "Advanced";
        },
      ),
    ]
  );

  // User Profile Methods
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Contact/Support Methods
  public query ({ caller }) func getSupportContactInfo() : async Text {
    "For assistance, please reach out using our support form. We will never ask for service payments, job guarantees, or banking information. Our content is educational and not affiliated with recruitment agencies.";
  };

  public shared ({ caller }) func submitHelpRequest(name : Text, email : Text, message : Text) : async Nat {
    let requestId = nextHelpRequestId;
    nextHelpRequestId += 1;

    let request : HelpRequest = {
      id = requestId;
      name;
      email;
      message;
      timestamp = 0;
    };

    helpRequests.add(requestId, request);
    requestId;
  };

  public query ({ caller }) func getAllHelpRequests() : async [HelpRequest] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can access help requests");
    };

    helpRequests.values().toArray();
  };

  // Educational Content Methods
  public query ({ caller }) func getLessonCategories() : async [LessonCategory] {
    categories.values().toArray();
  };

  public query ({ caller }) func getLessonsByCategory(categoryId : Nat) : async [Lesson] {
    let lessonsArray = lessons.values().toArray();
    let filteredIter = lessonsArray.values().filter(
      func(lesson) { lesson.categoryId == categoryId }
    );
    filteredIter.toArray().sort(Lesson.compareByCategoryAndId);
  };

  public query ({ caller }) func getLesson(lessonId : Nat) : async Lesson {
    switch (lessons.get(lessonId)) {
      case (null) { Runtime.trap("Lesson not found") };
      case (?lesson) { lesson };
    };
  };

  public query ({ caller }) func searchLessons(term : Text) : async [Lesson] {
    let lessonsArray = lessons.values().toArray();
    let filteredIter = lessonsArray.values().filter(
      func(lesson) {
        lesson.title.contains(#text term) or
        lesson.content.contains(#text term);
      }
    );
    filteredIter.toArray();
  };

  public query ({ caller }) func getDisclaimer() : async Text {
    "Important Disclaimer: All content provided is for informational purposes only. We strongly recommend caution when applying for remote jobs and want to emphasize that: - We do NOT guarantee income or employment by using this platform. - We do NOT charge fees for our guidance or job recommendations. - Our lessons focus on scam avoidance and financial safety. Please research and verify all opportunities independently.";
  };
};
