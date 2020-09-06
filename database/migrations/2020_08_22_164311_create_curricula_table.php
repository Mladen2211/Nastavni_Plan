<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCurriculaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('curricula', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('study_id')->constrained('studies');
            $table->foreignId('subject_id')->constrained('subjects');
            $table->foreignId('faculty_id')->constrained('faculties');
            $table->integer('semester');
            $table->string('academic_year');
            $table->integer('hours_of_lectures');
            $table->integer('hours_of_exercises');
            $table->integer('hours_of_seminars');
            $table->integer('ects');
            $table->timestamps();


            // $table->foreign('user_id')
            // ->references('id')
            // ->on('users');
            

            // $table->foreign('subject_id')
            // ->references('id')
            // ->on('studies');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('curricula');
    }
}
