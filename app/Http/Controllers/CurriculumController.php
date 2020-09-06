<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Hash;
use Illuminate\Support\Collection;
use App\Faculty;
use App\Study;
use App\Subject;
use App\Curriculum;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class CurriculumController extends Controller
{
    public function createNewCurriculum(Request $request){
        $curricula = [];
        $req = json_decode($request->getContent(), true);
        // echo $req;
        foreach ($req as $r) {
            $curriculum = Curriculum::create([
                'user_id' => $r['user_id'], 
                'subject_id' => $r['subject_id'], 
                'semester' => $r['semester'],
                'study_id' => $r['study_id'],
                'faculty_id' => $r['faculty_id'],
                'academic_year' => $r['academic_year'], 
                'hours_of_lectures' => $r['hours_of_lectures'], 
                'hours_of_exercises' => $r['hours_of_exercises'], 
                'hours_of_seminars' => $r['hours_of_seminars'],
                'ects' => $r['ects']
            ]);
            array_push($curricula, $curriculum);
            }

        return $curricula;

    }

    public function getCurriculum(){
        return DB::table('curricula')
                ->join('studies', 'studies.id', '=', 'curricula.study_id')
                ->join('users', 'users.id', '=', 'curricula.user_id')
                ->join('faculties', 'faculties.id', '=', 'curricula.faculty_id')
                ->join('subjects', 'subjects.id', '=', 'curricula.subject_id')
                ->select('curricula.*', 'studies.name as study_name', 'users.first_name as professor_first_name', 'users.last_name as professor_last_name', 'faculties.name as faculty_name', 'subjects.name as subject_name')
                ->get();
    }

    public function editCurriculumLine(Request $request)
    {
        return Curriculum::where('id', $request->id)->update([
                'user_id' => $request->user_id, 
                'subject_id' => $request->subject_id, 
                'semester' => $request->semester,
                'study_id' => $request->study_id,
                'faculty_id' => $request->faculty_id,
                'academic_year' => $request->academic_year, 
                'hours_of_lectures' => $request->hours_of_lectures, 
                'hours_of_exercises' => $request->hours_of_exercises, 
                'hours_of_seminars' => $request->hours_of_seminars,
                'ects' => $request->ects
        ]);
    }

    public function deleteCurriculum(Request $request){
        $curricula = [];
        $req = json_decode($request->getContent(), true);
        // echo $req;
        foreach ($req as $r) {
            $curriculum = Curriculum::where('id', $r['id'])->delete();
            array_push($curricula, $curriculum);
            }

        return $curricula;

    }

}