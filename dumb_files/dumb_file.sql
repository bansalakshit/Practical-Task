PGDMP                     	    y            simform %   10.18 (Ubuntu 10.18-0ubuntu0.18.04.1) %   10.18 (Ubuntu 10.18-0ubuntu0.18.04.1)     w           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            x           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            y           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            z           1262    33259    simform    DATABASE     m   CREATE DATABASE simform WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_IN' LC_CTYPE = 'en_IN';
    DROP DATABASE simform;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            {           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    13039    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            |           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            ?            1259    33270 
   categories    TABLE       CREATE TABLE public.categories (
    created timestamp without time zone DEFAULT now() NOT NULL,
    modified timestamp without time zone DEFAULT now() NOT NULL,
    id character varying NOT NULL,
    name character varying,
    user_id character varying
);
    DROP TABLE public.categories;
       public         simform    false    3            ?            1259    33260    tasks    TABLE        CREATE TABLE public.tasks (
    created timestamp without time zone DEFAULT now() NOT NULL,
    modified timestamp without time zone DEFAULT now() NOT NULL,
    id character varying NOT NULL,
    name character varying,
    category_id character varying,
    user_id character varying
);
    DROP TABLE public.tasks;
       public         simform    false    3            ?            1259    33280    users    TABLE     _  CREATE TABLE public.users (
    created timestamp without time zone DEFAULT now() NOT NULL,
    modified timestamp without time zone DEFAULT now() NOT NULL,
    id character varying NOT NULL,
    email character varying NOT NULL,
    display_name character varying,
    password_digest character varying,
    deleted boolean DEFAULT false NOT NULL
);
    DROP TABLE public.users;
       public         simform    false    3            s          0    33270 
   categories 
   TABLE DATA               J   COPY public.categories (created, modified, id, name, user_id) FROM stdin;
    public       simform    false    197           r          0    33260    tasks 
   TABLE DATA               R   COPY public.tasks (created, modified, id, name, category_id, user_id) FROM stdin;
    public       simform    false    196   ?       t          0    33280    users 
   TABLE DATA               e   COPY public.users (created, modified, id, email, display_name, password_digest, deleted) FROM stdin;
    public       simform    false    198   X       ?
           2606    33279 )   categories PK_24dbc6126a28ff948da33e97d3b 
   CONSTRAINT     i   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.categories DROP CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b";
       public         simform    false    197            ?
           2606    33269 $   tasks PK_8d12ff38fcc62aaba2cab748772 
   CONSTRAINT     d   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.tasks DROP CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772";
       public         simform    false    196            ?
           2606    33290 $   users PK_a3ffb1c0c8416b9fc6f907b7433 
   CONSTRAINT     d   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433";
       public         simform    false    198            ?
           2606    33301 )   categories FK_2296b7fe012d95646fa41921c8b    FK CONSTRAINT     ?   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "FK_2296b7fe012d95646fa41921c8b" FOREIGN KEY (user_id) REFERENCES public.users(id);
 U   ALTER TABLE ONLY public.categories DROP CONSTRAINT "FK_2296b7fe012d95646fa41921c8b";
       public       simform    false    197    198    2805            ?
           2606    33291 $   tasks FK_d94d89c9ec19bc4470e3368c905    FK CONSTRAINT     ?   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "FK_d94d89c9ec19bc4470e3368c905" FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.tasks DROP CONSTRAINT "FK_d94d89c9ec19bc4470e3368c905";
       public       simform    false    2803    196    197            ?
           2606    33296 $   tasks FK_db55af84c226af9dce09487b61b    FK CONSTRAINT     ?   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "FK_db55af84c226af9dce09487b61b" FOREIGN KEY (user_id) REFERENCES public.users(id);
 P   ALTER TABLE ONLY public.tasks DROP CONSTRAINT "FK_db55af84c226af9dce09487b61b";
       public       simform    false    196    2805    198            s   ?   x???;1?zs
.????:??4?|(??'?6?D=?????@|b>?vV^?T?,?;?j\L?C?:?(y?m?,?x?????E????@F8do?????????睯h(9???(?[ os5??P&
U??l???????Rz?B?      r   ?   x???1N1??Sp????;?砤?:qC??%"?/:??L܈?<ٞ?KT????Q?#McP?)ԋA^ZhV}4M??=?>??[D62i?z??Gie?~?V?C??M?
??s???X?????|??q???^WQ?e?VS_??o??8?+#~V????y??KS?      t   q   x?u?A?0 ?s?
>?N?6???>?p	?(#????pw?ˁ	) q?ܓ?1yME? ?/?<]8W??)&??i?\??46R`???|G?[3???ٲ???????~????s???#?     