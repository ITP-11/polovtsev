#!/bin/sh
s=0
while test $s -ne 5
do
echo "1 - Информация о создателе (ФИО, группа) и краткое описание выполняемых действий"
echo "2 - Вычисление математического выражения"
echo "3 - Копирование файлов заданного расширения с указанного места в папку «BackUp»в каталоге tmp"
echo "4 - Запрос и ввод имени пользователя, сравнение с текущим логическим именем пользователя и вывод сообщения: верно/неверно"
echo "5 - Выход"
echo 
echo -n "Выберите нужный пункт: "
read s
if test $s -eq 1
then
echo "Половцев Максим Сергеевич, ИТП-11. Лабораторная работа №4: 'Shell - программирование'"
else
if test $s -eq 2
then
echo -n "Введите номер компьютера, номер по журналу и Ваш возраст: "
read nc nu ag
x=`echo "($nc+$nu)*$ag" | bc -l `
echo "x = $x"
else 
if test $s -eq 3
then
echo -n "Введите адрес каталога: "
read way
echo -n "Введите расширение файлов: "
read exp
cp $way/*.$exp tmp/BackUp
else
if test $s -eq 4
then
echo -n "Введите имя пользователя: "
read username
if test "$username" = "$USER"
then
echo "Имя введено верно"
else
echo "Имя введено неверно"
fi
fi
fi
fi
fi
echo
done