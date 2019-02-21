using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MessageApp.Models
{
    public partial class MessageDBContext : DbContext
    {
        public MessageDBContext()
        {
        }

        public MessageDBContext(DbContextOptions<MessageDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Message> Message { get; set; }
        public virtual DbSet<UserData> UserData { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Message>(entity =>
            {
                entity.Property(e => e.MessageId).HasColumnName("messageID");

                entity.Property(e => e.SentAt)
                    .HasColumnName("sentAt")
                    .HasColumnType("datetime");

                entity.Property(e => e.SentFile)
                    .HasColumnName("sentFile")
                    .HasColumnType("text");

                entity.Property(e => e.SentMessage)
                    .IsRequired()
                    .HasColumnName("sentMessage")
                    .HasColumnType("text");

                entity.Property(e => e.UserId).HasColumnName("userID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Message)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Message__userID__4BAC3F29");
            });

            modelBuilder.Entity<UserData>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.Property(e => e.UserId).HasColumnName("userID");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(60);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(64);

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnName("status")
                    .HasMaxLength(30);

                entity.Property(e => e.UserImage).HasColumnName("userImage");

                entity.Property(e => e.UserName)
                    .HasColumnName("userName")
                    .HasMaxLength(20);
            });
        }
    }
}
