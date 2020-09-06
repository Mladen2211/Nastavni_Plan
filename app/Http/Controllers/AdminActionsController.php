<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Hash;
use App\Faculty;
use App\Study;
use App\Subject;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AdminActionsController extends Controller
{
    public function createFaculty(Request $request){
        // validate
        $this->validate($request, [
            'name'=> 'required',
        ]);

        $faculty = Faculty::create([
            'name' => $request->name,
        ]);
        
        return $faculty;
    }

    public function getFaculties(){
        return Faculty::orderBy('id', 'desc')->get();
    }

    public function createStudies(Request $request){
        // validate
        $this->validate($request, [
            'name'=> 'required',
            'facultyId' => 'required'
        ]);

        $study = Study::create([
            'name' => $request->name,
            'faculty_id' => $request->facultyId
        ]);
        
        return $study;
    }
    
    public function getStudies(){

        return DB::table('studies')
                ->join('faculties', 'faculties.id', '=', 'studies.faculty_id')
                ->select('studies.*', 'faculties.name as faculty_name')
                ->get();
    }

    public function createSubject(Request $request){
        $this->validate($request, [
            'name'=> 'required',
            'professorId' => 'required',
            'studyId' => 'required'
        ]);

        $Subject = Subject::create([
            'name' => $request->name,
            'user_id' => $request->professorId,
            'study_id' => $request->studyId
        ]);
        
        return $Subject;
    }

    public function getSubjects(){
        return DB::table('subjects')
                ->join('studies', 'studies.id', '=', 'subjects.study_id')
                ->join('users', 'users.id', '=', 'subjects.user_id')
                ->select('subjects.*', 'studies.name as study_name', 'users.first_name as professor_first_name', 'users.last_name as professor_last_name')
                ->get();
    }

}