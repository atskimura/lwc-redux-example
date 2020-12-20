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

    @AuraEnabled
    public static Task createTask(String content, String status){
        try {
            Task task = new Task(
                Subject = content,
                Status = status
            );
            insert task;
            return task;
        } catch (Exception e) {
            throw new TodoAppControllerException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Task updateTaskStatus(Id recordId, String status){
        try {
            Task task = [SELECT Id, Subject FROM Task WHERE Id = :recordId];
            task.Status = status;
            update task;
            return task;
        } catch (Exception e) {
            throw new TodoAppControllerException(e.getMessage());
        }
    }
}
