# Wallet Watch

Wallet Watch is an innovative application designed to help users log their expenses and income, offering the convenience of receiving overspend alerts if they exceed their set limits. This application not only aids in better financial management but also serves as a demonstration of my proficiency in cloud computing with AWS.

## Project Stack

- **Frontend**: React
- **Backend**: Spring Boot
- **Database**: MySQL

The entire infrastructure is deployed using AWS CloudFormation to showcase a comprehensive utilization of various AWS components.

### AWS Components Used

- **Compute**:
  - EC2
  - Lambda
- **Storage**:
  - RDS (MySQL)
  - S3
- **Network**:
  - Virtual Private Cloud (VPC)
- **General**:
  - Secrets Manager
  - EventBridge
  - Textract

## Running the Application

### Infrastructure Setup

1. Navigate to the `./infra` folder.
2. Execute all CloudFormation stacks in the specified order to set up the infrastructure.

### Frontend Setup

Inside the frontend directory:

1. Install dependencies: `pnpm install`
2. Start the development server: `pnpm run dev`

### Backend Setup

To run the Spring Boot backend, follow these steps:

1. Navigate to the server directory: `cd server/com.walletwatch.api`
2. Build the project: `./mvnw clean install`
3. Run the application: `./mvnw spring-boot:run`

Note: Replace `./mvnw` with `mvnw.cmd` if you are using Windows.

### Database Setup

Once the infrastructure is up:

1. Execute the deployment script located in the `db` folder to set up the database.

## Contributing

We welcome contributions to the Wallet Watch project! Whether you're interested in fixing bugs, adding new features, or improving documentation, your help is greatly appreciated.

### How to Contribute

1. **Fork the repository** - Start by forking the project repository to your GitHub account.
2. **Clone the forked repository** - Clone the repository to your local machine to start making changes.
3. **Create a new branch** - Make a new branch for your changes. This keeps the project's history organized.
4. **Make your changes** - Add your changes to the branch you've created. Whether it's a new feature or a bug fix, your contributions are valuable.
5. **Test your changes** - Ensure your changes do not break any existing functionality. Running tests and manually checking your changes are recommended steps.
6. **Commit your changes** - Write clear, concise commit messages that explain your changes effectively.
7. **Submit a pull request** - Push your changes to your fork and then submit a pull request to the main project. Provide a detailed description of your changes and the impact they have.

### Contribution Guidelines

- Ensure your code follows the project's coding standards.
- Document any new code or changes to existing code thoroughly.
- Include unit tests for new features or fixes whenever possible.
- Discuss large changes in an issue before starting to code.

Thank you for considering contributing to Wallet Watch! Your efforts help make this project better for everyone.
