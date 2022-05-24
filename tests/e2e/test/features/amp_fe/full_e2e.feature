Feature: Onboarding E2E full single application - Front End

    @amp_fe_sanity
    Scenario Outline: <TestID>: Run onboarding for New Users
        Then Set global data <Data>
        Given Onboarding /apply is opened
        # start: pre-app
        Then clear local session data
        When User completes preApp apply page

        And User completes preApp existing-customer page
        # end: pre-app

        # start: property
        And User completes intent property create page

        Then User moves to [property] cascading form section

        And User completes property address Section

        Then User moves to [property] cascading form section

        And User completes estimated value property create page

        Then User moves to [property] cascading form section

        Then User completes outstanding loan property create page

        Then User moves to [property] cascading form section

        Then User completes form on page continue to next page
        # end: property

        # start: loan
        Then User completes loan features section

        Then User completes form on page continue to next page
        # end: loan

        Examples:
            | TestID   | MobileNumber   | IncomeReduce | IncomeChange | CarAllowance | Data              |
            | OB_TC101 | (07) 0000 0010 | No           | No           | No           | scenario_OB_TC101 |
