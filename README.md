
Unit Test:
    Test a unit of an application without its external dependencies like databases or web services.
    - Easy to write and execute.
    - Very accurate when pinpointing a bug
    - Not very reliable. Do not test dependencies outside the code
    - Great for quicly testing the logic of conditional statements, loops and functions with complex logic and calculations
    - Favor Unit Tests over Integration Testing or End-to-end Testing

Integration Testing:
    - Test the application with its external dependencies (database or web services).
    - Great for applications that involve writing/reading data to a database, but take longer to execute.
    - More reliable than unit tests.
    - Use them to cover gaps of unit tests

End-to-end Testing:
    - Drive an application through its user interface and record the interaction of an user with the application to check if the 
    application is returning the right result.
    - Provides the highest level of reliability but is very slow and prone to small changes in the UI or the code.
    - Use them only for testing key functionalities like loggin in
    


