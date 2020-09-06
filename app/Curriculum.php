<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Curriculum extends Model
{
    /*
    user_id, subject_id, semester, academic_year, hours_of_lectures, hours_of_exercises, hours_of_seminars
    */ 

    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [ 'user_id', 'subject_id', 'study_id', 'faculty_id', 'semester', 'academic_year', 'hours_of_lectures', 'hours_of_exercises', 'hours_of_seminars', 'ects'];
}
