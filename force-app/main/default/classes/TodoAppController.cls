public with sharing class TodoAppController {
    class TodoAppControllerException extends Exception {}

    @AuraEnabled(cacheable=true)
    public static Task[] getTaskList(){
        try {
            return [SELECT Id, Subject, Status FROM Task USING SCOPE MINE];
        } catch (Exception e) {
            throw new TodoAppControllerException(e.getMessage());
        }
    }
}
