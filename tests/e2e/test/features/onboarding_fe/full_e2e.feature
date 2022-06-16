Feature: Onboarding E2E full single application - Front End

    @ob_fe_sanity
    Scenario Outline: <TestID>: Run onboarding for New Users
        Then Set global data <Data>

        Examples:
            | TestID   | MobileNumber   | IncomeReduce | IncomeChange | CarAllowance | Data              |
            | OB_TC101 | (07) 0000 0010 | No           | No           | No           | scenario_OB_TC101 |
