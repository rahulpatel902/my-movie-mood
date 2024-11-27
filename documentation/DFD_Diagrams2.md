# Data Flow Diagrams (DFD) - My Movie Mood Application

## Level 0 (Context Diagram)
```mermaid
graph TD
    User((User))
    System[My Movie Mood System]
    TMDB[TMDB API]
    Firebase[Firebase Auth]
    
    User -->|Login/Mood Input| System
    System -->|Movie Recommendations| User
    System -->|Movie Data Request| TMDB
    TMDB -->|Movie Data| System
    System -->|Auth Request| Firebase
    Firebase -->|Auth Response| System
```

## Level 1 DFD
```mermaid
graph TD
    User((User))
    Auth[Authentication System]
    MoodAnalysis[Mood Analysis]
    MovieRec[Movie Recommendation Engine]
    TMDB[TMDB API]
    Firebase[Firebase Auth]
    
    User -->|Login Credentials| Auth
    Auth -->|Auth Request| Firebase
    Firebase -->|Auth Response| Auth
    Auth -->|User Session| MoodAnalysis
    User -->|Mood Input| MoodAnalysis
    MoodAnalysis -->|Mood Parameters| MovieRec
    MovieRec -->|Movie Query| TMDB
    TMDB -->|Movie Data| MovieRec
    MovieRec -->|Recommendations| User
```

## Level 2 DFD
```mermaid
graph TD
    User((User))
    
    %% Authentication Subsystem
    Login[Login Process]
    Register[Registration]
    Session[Session Management]
    
    %% Mood Analysis Subsystem
    MoodInput[Mood Input Interface]
    MoodProcess[Mood Processing]
    
    %% Movie Recommendation Subsystem
    MovieFilter[Movie Filter]
    GenreMap[Genre Mapping]
    ResultSort[Result Sorting]
    
    %% External Systems
    TMDB[TMDB API]
    Firebase[Firebase Auth]
    
    %% Data Stores
    UserPrefs[(User Preferences)]
    MoodMap[(Mood-Genre Mapping)]
    
    %% Authentication Flow
    User -->|Login| Login
    User -->|Register| Register
    Login -->|Verify| Firebase
    Register -->|Create| Firebase
    Firebase -->|Token| Session
    
    %% Mood Analysis Flow
    User -->|Select Mood| MoodInput
    MoodInput -->|Mood Data| MoodProcess
    MoodProcess -->|Genre Preferences| MoodMap
    
    %% Movie Recommendation Flow
    MoodProcess -->|Mood Parameters| MovieFilter
    MovieFilter -->|Genre Query| GenreMap
    GenreMap -->|Movie Request| TMDB
    TMDB -->|Movie Data| ResultSort
    ResultSort -->|Final Recommendations| User
    
    %% Data Store Interactions
    Session -->|Store| UserPrefs
    UserPrefs -->|Load| MovieFilter
```

## Level 3 DFD - Authentication Subsystem Detail
```mermaid
graph TD
    %% User Interface
    LoginUI[Login Interface]
    RegUI[Registration Interface]
    
    %% Authentication Processes
    ValidateInput[Input Validation]
    HashPass[Password Hashing]
    TokenMgmt[Token Management]
    SessionMgmt[Session Management]
    
    %% Security
    SecurityCheck[Security Verification]
    RateLimit[Rate Limiting]
    
    %% External Systems
    Firebase[Firebase Auth]
    
    %% Data Stores
    SessionDB[(Session Store)]
    SecurityLog[(Security Logs)]
    
    %% Login Flow
    LoginUI -->|Credentials| ValidateInput
    ValidateInput -->|Valid Input| HashPass
    HashPass -->|Hashed Credentials| SecurityCheck
    SecurityCheck -->|Auth Request| Firebase
    
    %% Registration Flow
    RegUI -->|New User Data| ValidateInput
    ValidateInput -->|Validated Data| HashPass
    
    %% Session Management
    Firebase -->|Auth Token| TokenMgmt
    TokenMgmt -->|Session Token| SessionMgmt
    SessionMgmt -->|Store Session| SessionDB
    
    %% Security Logging
    SecurityCheck -->|Log Activity| SecurityLog
    RateLimit -->|Monitor| SecurityCheck
```

## Complete Website Data Flow Diagram - My Movie Mood

## Website Data Flow Overview
```mermaid
graph TD
    %% User Interface Components
    UI_Home[Home Page]
    UI_Auth[Auth Page]
    UI_Dashboard[Dashboard]
    UI_MoodSelect[Mood Selection]
    UI_Results[Results Page]
    UI_Profile[Profile Page]

    %% External Services
    Firebase[Firebase Auth]
    TMDB[TMDB API]

    %% Data Stores
    LocalStorage[(Local Storage)]
    SessionStore[(Session Storage)]

    %% Processing Components
    AuthProcess[Authentication Handler]
    MoodProcessor[Mood Processing Engine]
    MovieFetcher[Movie Data Fetcher]
    RecommendationEngine[Recommendation Engine]
    GenreMapper[Genre Mapper]

    %% User Actions
    User((User))
    
    %% Home Page Flow
    User -->|Visit Site| UI_Home
    UI_Home -->|Login Click| UI_Auth
    UI_Home -->|Register Click| UI_Auth

    %% Authentication Flow
    UI_Auth -->|Submit Credentials| AuthProcess
    AuthProcess -->|Verify| Firebase
    Firebase -->|Auth Token| AuthProcess
    AuthProcess -->|Store Token| SessionStore
    AuthProcess -->|Success| UI_Dashboard

    %% Dashboard & Mood Selection Flow
    UI_Dashboard -->|Select Mood| UI_MoodSelect
    UI_MoodSelect -->|Mood Data| MoodProcessor
    MoodProcessor -->|Process Mood| GenreMapper
    GenreMapper -->|Genre Parameters| MovieFetcher

    %% Movie Data Flow
    MovieFetcher -->|API Request| TMDB
    TMDB -->|Movie Data| MovieFetcher
    MovieFetcher -->|Raw Movies| RecommendationEngine
    RecommendationEngine -->|Filtered Movies| UI_Results

    %% Profile Management
    UI_Dashboard -->|View Profile| UI_Profile
    UI_Profile -->|Update Preferences| LocalStorage
    LocalStorage -->|Load Preferences| RecommendationEngine

    %% Session Management
    SessionStore -->|Verify Session| UI_Dashboard
    SessionStore -->|Auth Status| UI_Profile

    %% Data Persistence
    RecommendationEngine -->|Save History| LocalStorage
    LocalStorage -->|Load History| UI_Profile

    %% Styling
    classDef external fill:#f96,stroke:#333
    classDef storage fill:#69f,stroke:#333
    classDef process fill:#9f6,stroke:#333
    classDef ui fill:#f9f,stroke:#333

    class Firebase,TMDB external
    class LocalStorage,SessionStore storage
    class AuthProcess,MoodProcessor,MovieFetcher,RecommendationEngine,GenreMapper process
    class UI_Home,UI_Auth,UI_Dashboard,UI_MoodSelect,UI_Results,UI_Profile ui
```

## Data Flow Description

### 1. Initial Access Flow
- User visits the website
- Home page checks authentication status
- Unauthenticated users are directed to login/register

### 2. Authentication Flow
- User submits credentials
- Firebase validates credentials
- Authentication token stored in session
- User redirected to dashboard

### 3. Mood Selection Flow
- User selects current mood
- Mood processor analyzes selection
- Genre mapper converts mood to genre preferences
- Parameters passed to movie fetcher

### 4. Movie Recommendation Flow
- Movie fetcher queries TMDB API
- Raw movie data processed
- Recommendation engine applies filters
- Results displayed to user

### 5. Profile Management Flow
- User preferences stored locally
- History tracked in local storage
- Profile page displays user data
- Settings affect recommendation algorithm

### 6. Session Management Flow
- Authentication status maintained
- Token validation for protected routes
- Automatic logout on token expiry

### 7. Data Persistence
- User preferences saved locally
- Watch history maintained
- Settings preserved between sessions

## Key Components

### User Interface Components
- **Home Page**: Entry point
- **Auth Page**: Login/Registration
- **Dashboard**: Main user interface
- **Mood Selection**: Mood input interface
- **Results Page**: Movie recommendations
- **Profile Page**: User settings and history

### Processing Components
- **Authentication Handler**: Manages user auth
- **Mood Processing Engine**: Analyzes user mood
- **Movie Data Fetcher**: Interfaces with TMDB
- **Recommendation Engine**: Filters and sorts movies
- **Genre Mapper**: Converts moods to genres

### Data Stores
- **Local Storage**: Persistent user data
- **Session Storage**: Temporary session data

### External Services
- **Firebase Auth**: Authentication service
- **TMDB API**: Movie database

This diagram provides a complete overview of how data flows through your Movie Mood website, from user interaction to data storage and external service integration.

This DFD documentation provides a hierarchical view of your system's data flows, from the highest-level context diagram (Level 0) down to detailed process flows (Level 3). Each level provides increasing detail about specific system components:

- **Level 0**: Shows the system as a single process interacting with external entities
- **Level 1**: Breaks down the main system into major processes
- **Level 2**: Expands each major process into sub-processes
- **Level 3**: Provides detailed process flows for the authentication subsystem

The diagrams use Mermaid syntax for better visualization and can be rendered in any Markdown viewer that supports Mermaid diagrams.
