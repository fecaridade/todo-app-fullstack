from django.db import models




class Todo(models.Model):
    name = models.CharField(max_length=100)
    is_done = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)



    def mark_todo(self):
        is_active = False
        if not self.is_done:
            is_active = True
            
        self.is_done = is_active
        return self.save()




    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['created_at']




