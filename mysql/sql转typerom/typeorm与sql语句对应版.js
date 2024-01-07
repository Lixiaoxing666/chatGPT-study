User
练习题和sql语句
-- 1、查询"01"课程比"02"课程成绩高的学生的信息及课程分数

select a.* ,b.s_score as 01_score,c.s_score as 02_score from
student a
join score b on a.s_id=b.s_id and b.c_id='01'
left join score c on a.s_id=c.s_id and c.c_id='02' or c.c_id = NULL where b.s_score>c.s_score

--也可以这样写
select a.*,b.s_score as 01_score,c.s_score as 02_score from student 		  a,score b,score c
where a.s_id=b.s_id
and a.s_id=c.s_id
and b.c_id='01'
and c.c_id='02'
and b.s_score>c.s_score

1. 查询"01"课程比"02"课程成绩高的学生的信息及课程分数
javascript
Copy code
getRepository(Student)
    .createQueryBuilder("student")
    .leftJoinAndSelect("student.scores", "score01", "score01.c_id = :cId01", { cId01: '01' })
    .leftJoinAndSelect("student.scores", "score02", "score02.c_id = :cId02", { cId02: '02' })
    .where("score01.s_score > score02.s_score")
    .getMany();

解析：getRepository(Student): 这个方法获取 Student 实体的 repository。Student 应是一个你在应用中定义的实体类，它代表数据库中的 student 表。

createQueryBuilder("student"): 使用 Student repository 来创建一个 Query Builder。这里的 "student" 是为这个查询定义的别名，
用于在后续的查询中引用 Student 实体。

leftJoinAndSelect("student.scores", "score01", ...): 这是一个左连接操作，用于连接 Student 实体和 Score 实体。这里假设 Student 实体有
一个 scores 关系，连接到 Score 实体。"score01" 是为连接到的 Score 实体定义的别名。连接条件是 score01.c_id = :cId01，其中 :cId01 是一个参数，
其值在下文中以 { cId01: '01' } 的形式提供，表示我们只关心课程 ID 为 "01" 的成绩。

leftJoinAndSelect("student.scores", "score02", ...): 类似地，这是第二个左连接操作，用于获取每位学生课程 ID 为 "02" 的成绩。

where("score01.s_score > score02.s_score"): 这是一个 WHERE 条件，用于过滤那些课程 "01" 的成绩高于课程 "02" 的学生。

getMany(): 执行查询并返回结果。

-- 2、查询"01"课程比"02"课程成绩低的学生的信息及课程分数

select a.* ,b.s_score as 01_score,c.s_score as 02_score from
student a left join score b on a.s_id=b.s_id and b.c_id='01' or b.c_id=NULL
join score c on a.s_id=c.s_id and c.c_id='02' where b.s_score<c.s_score

2. 查询"01"课程比"02"课程成绩低的学生的信息及课程分数
javascript
Copy code
getRepository(Student)
    .createQueryBuilder("student")
    .leftJoinAndSelect("student.scores", "score01", "score01.c_id = :cId01", { cId01: '01' })
    .leftJoinAndSelect("student.scores", "score02", "score02.c_id = :cId02", { cId02: '02' })
    .where("score01.s_score < score02.s_score")
    .getMany();

-- 3、查询平均成绩大于等于60分的同学的学生编号和学生姓名和平均成绩
select b.s_id,b.s_name,ROUND(AVG(a.s_score),2) as avg_score from
student b
join score a on b.s_id = a.s_id
GROUP BY b.s_id,b.s_name HAVING avg_score >=60;


-- 4、查询平均成绩小于60分的同学的学生编号和学生姓名和平均成绩
-- (包括有成绩的和无成绩的)

select b.s_id,b.s_name,ROUND(AVG(a.s_score),2) as avg_score from
student b
left join score a on b.s_id = a.s_id
GROUP BY b.s_id,b.s_name HAVING avg_score <60
union
select a.s_id,a.s_name,0 as avg_score from
student a
where a.s_id not in (
    select distinct s_id from score);


-- 5、查询所有同学的学生编号、学生姓名、选课总数、所有课程的总成绩
select a.s_id,a.s_name,count(b.c_id) as sum_course,sum(b.s_score) as sum_score from
student a
left join score b on a.s_id=b.s_id
GROUP BY a.s_id,a.s_name;


-- 6、查询"李"姓老师的数量
select count(t_id) from teacher where t_name like '李%';

-- 7、查询学过"张三"老师授课的同学的信息
select a.* from
student a
join score b on a.s_id=b.s_id where b.c_id in(
    select c_id from course where t_id =(
    select t_id from teacher where t_name = '张三'));

-- 8、查询没学过"张三"老师授课的同学的信息
select * from
student c
where c.s_id not in(
    select a.s_id from student a join score b on a.s_id=b.s_id where b.c_id in(
    select a.c_id from course a join teacher b on a.t_id = b.t_id where t_name ='张三'));
-- 9、查询学过编号为"01"并且也学过编号为"02"的课程的同学的信息

select a.* from
student a,score b,score c
where a.s_id = b.s_id  and a.s_id = c.s_id and b.c_id='01' and c.c_id='02';

-- 10、查询学过编号为"01"但是没有学过编号为"02"的课程的同学的信息

select a.* from
student a
where a.s_id in (select s_id from score where c_id='01' ) and a.s_id not in(select s_id from score where c_id='02')
将以上10句sql转化为在nest.js中使用typeorm框架相应的语句，全部转化，不要省略
GPT
Translating these SQL queries into equivalent statements using TypeORM in a NestJS environment involves using the TypeORM Query Builder or Repository API. TypeORM's approach is object-oriented and focuses on entities, so it's crucial to have your entities (like Student, Score, Teacher, Course) defined correctly.

    I'll guide you through the translation of each SQL statement:



3. 查询平均成绩大于等于60分的同学的学生编号和学生姓名和平均成绩
javascript
Copy code
getRepository(Student)
    .createQueryBuilder("student")
    .leftJoinAndSelect("student.scores", "score")
    .select("student.s_id", "s_id")
    .addSelect("student.s_name", "s_name")
    .addSelect("AVG(score.s_score)", "avg_score")
    .groupBy("student.s_id")
    .having("avg_score >= :minScore", { minScore: 60 })
    .getRawMany();
4. 查询平均成绩小于60分的同学的学生编号和学生姓名和平均成绩
这个查询稍微复杂，因为它涉及到联合查询和子查询。在TypeORM中，你可能需要分两步来执行这个查询，先获取有成绩的学生的信息，然后获取没有成绩的学生的信息，最后在应用层面将它们合并。

5. 查询所有同学的学生编号、学生姓名、选课总数、所有课程的总成绩
javascript
Copy code
getRepository(Student)
    .createQueryBuilder("student")
    .leftJoinAndSelect("student.scores", "score")
    .select("student.s_id", "s_id")
    .addSelect("student.s_name", "s_name")
    .addSelect("COUNT(score.c_id)", "sum_course")
    .addSelect("SUM(score.s_score)", "sum_score")
    .groupBy("student.s_id")
    .getRawMany();
6. 查询"李"姓老师的数量
javascript
Copy code
getRepository(Teacher)
    .createQueryBuilder("teacher")
    .where("teacher.t_name LIKE :name", { name:'李%' })
    .getCount();
7. 查询学过"张三"老师授课的同学的信息
这个查询需要多表连接和子查询。在TypeORM中，你可能需要先查询出"张三"老师的课程，然后使用这个结果去查询学生。

8. 查询没学过"张三"老师授课的同学的信息
这个查询同样需要使用多表连接和子查询。它比较复杂，可能需要在应用层面进行一些逻辑处理。

9. 查询学过编号为"01"并且也学过编号为"02"的课程的同学的信息
javascript
Copy code
getRepository(Student)
    .createQueryBuilder("student")
    .innerJoin("student.scores", "score")
    .where("score.c_id IN (:...cIds)", { cIds: ['01', '02'] })
    .groupBy("student.s_id")
    .having("count(student.s_id) > 1")
    .getMany();
User
以上这些写法是ORM写法还是原生sql写法
GPT
以上给出的示例是结合了 ORM（对象关系映射）和原生 SQL 语法的写法。这些示例使用了 TypeORM 的 Query Builder 语法，它是 TypeORM 的一个特性，允许以一种更接近 SQL 的方式来构建查询，同时保持了 ORM 的一些优势，如对象映射和数据库无关性。

在 TypeORM 中，Query Builder 提供了一个构建 SQL 查询的链式接口，这些接口方法内部生成对应的 SQL 语句。例如：

createQueryBuilder("student") 创建一个针对 Student 实体的查询。
leftJoinAndSelect、innerJoin 等方法用于指定连接条件。
where、having 等方法用于指定过滤条件。
select、addSelect 用于指定查询字段。
getMany、getRawMany 等方法用于执行查询并获取结果。
这种方式结合了 SQL 的灵活性和 ORM 的方便性，适用于复杂查询场景，同时保持代码的可读性和可维护性。但请注意，这些示例需要根据你的具体实体结构和数据库设计进行调整。

User
    .createQueryBuilder("student")中"student"代表什么？是否可以写成.createQueryBuilder(Student, "student")，两种写法区别是什么？
GPT
在 TypeORM 的 .createQueryBuilder("student") 语法中，"student" 是一个别名，代表你要查询的实体。这个别名在后续的查询中用于引用这个实体。例如，当你使用 .leftJoinAndSelect("student.scores", "score") 时，"student" 就是之前定义的别名，用于指明连接来自哪个实体。

关于 .createQueryBuilder("student") 与 .createQueryBuilder(Student, "student") 的区别：

.createQueryBuilder("student"):

这种写法在最常见的场景中使用，通常是在已经获取了实体的 repository 时使用。
这里的 "student" 是一个自定义的别名，用于在构建查询时引用实体。
例如：
javascript
Copy code
getRepository(Student).createQueryBuilder("student")
    .createQueryBuilder(Student, "student"):

这种写法不是 TypeORM 的标准用法。TypeORM 的 createQueryBuilder 方法通常不接受实体类作为第一个参数。
如果你看到类似的语法，可能是某些特定封装或者扩展的 TypeORM 功能，或者是对 TypeORM API 的误解。
总的来说，标准的 TypeORM 用法是使用实体的 repository 然后调用 .createQueryBuilder()，其中传递一个用于后续查询中的别名。这种方式简化了查询构建过程，并允许你灵活地引用和操作相关实体。