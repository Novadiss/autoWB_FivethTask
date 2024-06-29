Feature: Search a course
    Scenario: Testing place check
        Given user is on "/client/index.php" page
        When user check film "li:nth-child(2) > a"
        Then user see page with code "Получить код бронирования"

