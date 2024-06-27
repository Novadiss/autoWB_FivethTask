Feature: Search a course
    Scenario: Testing place check
        Given user is on "/client/index.php" page
        When user check place "div:nth-child(8) > span:nth-child(4)"
        Then user see page with code "Получить код бронирования"

