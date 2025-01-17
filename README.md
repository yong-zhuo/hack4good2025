 # **Minimart@MWH**

Minimart@MWH is a digital platform designed to empower residents of the Muhammadiyah Welfare Home (MWH) through a token economy system. It enables residents to manage vouchers, request items, and learn essential life skills, while administrators efficiently manage stock, approve orders, and distribute vouchers.

![Screenshot 2025-01-17 182028](https://github.com/user-attachments/assets/440386e4-3816-40b8-910b-a0437afd9939)
---
## **Table of Contents**
1. [Inspiration](#inspiration)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Setup and Installation](#setup-and-installation)
5. [How to Access the Admin Account](#how-to-access-the-admin-account)
6. [Challenges Faced](#challenges-faced)
7. [Accomplishments](#accomplishments)
8. [What's Next](#whats-next)

---

## **Inspiration**
The idea for Minimart@MWH came from a problem statement by MWH that challenged us to create a digital minimart powered by a token economy. We found this idea both novel and meaningful, as it could teach residents valuable skills like financial management, foster positive behavior, and improve discipline, all while motivating them to learn and grow.

---

## **Features**
### **For Residents**
- View products and their stock quantity.
- Request items using vouchers.
- Edit profile and reset password.
- Request vouchers with justifications for completed tasks.
- View voucher balance and order history.

### **For Administrators**
- Distribute vouchers to residents with justifications.
- Manage item stock and set voucher prices.
- Manage user account permissions, such as suspending accounts.
- Approve or reject voucher requests from residents.
- Track order and voucher activity for all residents.

---

## **Tech Stack**
- **Frontend**: React, Next.js
- **Backend**: Firebase (Authentication, Firestore Database)
- **Styling**: Tailwind CSS

---

## **Setup and Installation**
Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/minimart-mwh.git
   cd minimart-mwh
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore and Authentication.
   - Add your Firebase configuration to `firebaseConfig.js`.

4. Run the development server:
   ```bash
   npm run dev
   ```

5.	Open the app in your browser:
   ```bash
   http://localhost:3000
   ```

6.	Alternatively, access the deployed version [here](https://minimartmwh.vercel.app/).


---

## **How to Access the Admin Account**
To log in as an administrator, follow these steps:

1. On the welcome page, click the **Admin** button.
2. Use the following credentials to log in:
   - **Email**: `123@email.com`
   - **Password**: `123123`

Due to time constraints and the complexity of implementing a secure admin account creation system, we opted to provide a single pre-configured admin account for now. This decision ensures that the admin account cannot be abused by residents, safeguarding the platform’s integrity while maintaining functionality. Future updates will focus on improving this feature.

---

## **Challenges Faced**
- **Edge Cases**: Designing a seamless user experience required handling numerous edge cases for both residents and administrators.
- **Learning Curve**: Adapting to new technologies like Firebase, Next.js, and Tailwind CSS posed initial challenges.
- **Time Constraints**: Developing a fully functional prototype within 4 days while managing schoolwork was demanding.

---

## **Accomplishments**
- Delivered a polished and functional prototype within 4 days.
- Integrated robust features for both residents and administrators.
- Learned and utilized new technologies, enhancing our web development skills.

---

## **What's Next**
- **Automation**: Integrate LMS platforms or behavior trackers for automated voucher distribution.
- **POS Integration**: Automate stock updates through point-of-sale systems.
- **Accessibility Improvements**: Enhance the user interface for better accessibility and usability.

---

## **Contributors**
- **Yap Yong Zhuo**
- **Ho Wei Nian**
- **Sivakumar Karthikraj**

---

## **License**
This project is licensed under the [MIT License](LICENSE).
